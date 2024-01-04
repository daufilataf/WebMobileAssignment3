import projects from "./projects";
function Project(props) {
  return (
    <div className="project-info" id={props.id}>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
      <img src={props.img} alt="img" width="300px" height="300px" />
      <h3 className="project-name">{props.name}</h3>
      
        Explore
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="home">
      <div className="head">
        <div className="personal">
          
          <h1><a href="https://github.com/fuadfatali1" target="_blank">Fuad Fataliyev</a></h1>
          <p>Senior Computer Science Student</p>
        </div>
      </div>
      <div className="contentPage">
        <h1>List of Projects:</h1>
        <div className="proj-container">
          {projects.map((proj) => {
            return (
              <Project
                id={proj.id}
                key={proj.id}
                name={proj.name}
                img={proj.img}
                link={proj.link}
              ></Project>
            );
          })}
        </div>
      </div>
    </div>
  );
}