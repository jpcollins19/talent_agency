import { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Route, Link } from "react-router-dom";
import { updateClientSkill } from "./store";

class Client_Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.client ? this.props.client.id : "",
      name: this.props.client ? this.props.client.name : "",
      skills: this.props.client ? this.props.client.skills : "",
      skillListing: this.props.skillListing ? this.props.skillListing : "",
      skillIdToAdd: "",
      deleteNeeded: false,
      skillIdToDelete: "",
      error: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.client.skills.length !== this.props.client.skills.length) {
      const { id, name, skills, deleteNeeded } = this.props.client;
      this.setState({ id, name, skills, deleteNeeded: false });
    }
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {
        id,
        name,
        skills,
        skillIdToAdd,
        skillListing,
        deleteNeeded,
        skillIdToDelete,
      } = this.state;

      if (deleteNeeded) {
        const client = {
          id,
          name,
          skills: skills.filter(
            (skill) => skill.id !== Number(skillIdToDelete)
          ),
        };

        await this.props.updateClient(client);
      } else {
        const skillToAddObj = skillListing.filter(
          (skill) => skill.id === Number(skillIdToAdd)
        )[0];

        const client = {
          id,
          name,
          skills: [...skills, skillToAddObj],
        };

        await this.props.updateClient(client);
      }
    } catch (err) {
      console.log(err);
      // this.setState({ error: err.response.data });
    }
  };

  render() {
    const { id, name, skills, skillListing, skillIdToDelete } = this.state;

    const { handleSubmit } = this;

    return skills.length === 0 ? (
      <form key={id} onSubmit={handleSubmit}>
        <h3>{name}</h3>
        <div>{name} currently has no skills.</div>

        <div className="add-skill-cont">
          <select
            className="skill-dropdown-cont"
            onChange={(ev) => this.setState({ skillIdToAdd: ev.target.value })}
          >
            <option>Choose Skill</option>
            {skillListing
              .filter((skill) => {
                const skillList = skills.map((skill) => {
                  return skill.id;
                });

                if (!skillList.includes(skill.id)) {
                  return skill;
                }
              })
              .map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
          </select>
          <button
            className="add-skill-button"
            disabled={skills.length === skillListing.length}
          >
            Add Skill
          </button>
        </div>
        <div className="home-page-link">
          <Link to="/">back to home page</Link>
        </div>
      </form>
    ) : (
      <form key={id} onSubmit={handleSubmit}>
        <h3>{name}</h3>
        <div>{name} has the following skills:</div>
        <ul>
          {skills.map((skill) => (
            <li key={skill.id}>
              <div className="skill-cont">
                <div className="skill-name">{skill.name}</div>
                <button
                  value={skill.id}
                  onClick={(ev) =>
                    this.setState({
                      deleteNeeded: true,
                      skillIdToDelete: ev.target.value,
                    })
                  }
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="add-skill-cont">
          <select
            className="skill-dropdown-cont"
            onChange={(ev) => this.setState({ skillIdToAdd: ev.target.value })}
          >
            <option>Choose Skill</option>
            {skillListing
              .filter((skill) => {
                const skillList = skills.map((skill) => {
                  return skill.id;
                });

                if (!skillList.includes(skill.id)) {
                  return skill;
                }
              })
              .map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
          </select>
          <button
            className="add-skill-button"
            disabled={skills.length === skillListing.length}
          >
            Add Skill
          </button>
        </div>
        <div className="home-page-link">
          <Link to="/">back to home page</Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const client = state.clients.find(
    (client) => client.id === match.params.id * 1
  );

  const skillListing = state.skills;

  return {
    client,
    skillListing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClient: (client) => {
      dispatch(updateClientSkill(client));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Client_Single);
