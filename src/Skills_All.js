import { connect } from "react-redux";
import { HashRouter as Router, Link } from "react-router-dom";

const Skills_All = ({ skills }) => {
  return (
    <div>
      <h2>Skills</h2>
      <Router>
        {skills.map((skill) => (
          <div key={skill.id}>
            <Link to={`/skills/${skill.id}`}>
              {skill.name} ({skill.clients ? skill.clients.length : 0})
            </Link>
          </div>
        ))}
      </Router>
    </div>
  );
};

export default connect((state) => state)(Skills_All);
