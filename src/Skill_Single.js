import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateSkill } from "./store";

class Skill_Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.skill ? this.props.skill.name : "",
      updated: false,
      error: "",
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.client.skills.length !== this.props.client.skills.length) {
  //     const { id, name, skills } = this.props.client;
  //     this.setState({ id, name, skills });
  //   }
  // }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name } = this.state;

      await this.props.updateASkill({
        id: this.props.skill.id,
        name,
      });
    } catch (err) {
      console.log(err);
      this.setState({ error: err.response.data });
    }
  };

  render() {
    const { name } = this.state;
    const { handleSubmit } = this;

    return (
      <form className="single-skill-cont" onSubmit={handleSubmit}>
        <input
          name="name"
          value={name}
          onChange={(ev) =>
            this.setState({ name: ev.target.value, updated: true })
          }
        />
        <button disabled={!this.state.updated || this.state.name.length === 0}>
          update
        </button>
        <button>
          <Link to="/">cancel</Link>
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const skill = state.skills.find((skill) => skill.id === match.params.id * 1);

  return { skill };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateASkill: (skill) => dispatch(updateSkill(skill, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skill_Single);
