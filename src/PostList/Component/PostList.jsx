import { useNavigate } from "react-router-dom";

import styles from "../Style/postlist.module.css";

function CategoryRender({ category }) {
  return (
    <div className={styles.category}>
      <p>{category}</p>
    </div>
  );
}

function TitleRender({ title }) {
  return (
    <div className={styles.title}>
      <p>{title}</p>
    </div>
  );
}

function ContentsRender({ contents }) {
  const htmlString = contents;

  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = doc.querySelectorAll("img");

    images.forEach((img) => {
      img.style.display = "none";
    });

    return doc.body.innerHTML;
  };

  const modifiedHtml = applyStyles(htmlString);

  return (
    <div
      className={styles.contents}
      dangerouslySetInnerHTML={{ __html: modifiedHtml }}
    />
  );
}

function DateTimeRender({ reg, mod, view }) {
  const date = new Date(reg);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const min = date.getMinutes();

  const paddedHour = String(hour).padStart(2, 0);
  const paddedMin = String(min).padStart(2, 0);

  return (
    <div className={styles.date}>
      <p>
        {year}년 {month}월 {day}일 {paddedHour}:{paddedMin}
        {reg !== mod && <span>(수정됨)</span>}
        <span> | {view}</span>
      </p>
    </div>
  );
}

function PostList({ postList }) {
  const navigate = useNavigate();

  return postList.map((post, index) => {
    return (
      <div key={post.postSeq}>
        <div
          className={styles.postlist_box}
          onClick={() =>
            navigate(`/post/${post.postSeq}`, {
              state: { postSeq: post.postSeq },
            })
          }
        >
          <CategoryRender category={post.categoryName} />
          <TitleRender title={post.postTitle} />
          <ContentsRender contents={post.postContents} />

          <DateTimeRender
            reg={post.regDate}
            mod={post.modDate}
            view={post.viewed}
          />
        </div>

        <hr className={index != postList.length - 1 ? styles.hr : styles.hr2} />
      </div>
    );
  });
}

export default PostList;
