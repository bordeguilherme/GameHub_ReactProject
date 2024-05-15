import "./style.css";

function ImgAbout({ item }) {
  const linkGithub = `https://github.com/${item.login}`;

  return (
    <a href={linkGithub} target="_blank" className="img-about">
      <img src={item.avatar_url} alt={item.login} />
      <h3>{item.name}</h3>
    </a>
  );
}

export default ImgAbout;
