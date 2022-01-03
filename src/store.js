import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";

//////////////////////////////////// ACTION TYPES below:

const LOAD_CLIENTS = "LOAD_CLIENTS";
const LOAD_SKILLS = "LOAD_SKILLS";
// const DELETE_SKILL = "DELETE_SKILL";
// const ADD_SKILL = "ADD_SKILL";
const UPDATE_CLIENT_SKILL = "UPDATE_CLIENT_SKILL";
const UPDATE_SKILL = "UPDATE_SKILL";

//////////////////////////////////// ACTION CREATORS below:

const _loadClients = (clients) => {
  return { type: LOAD_CLIENTS, clients };
};

const _loadSkills = (skills) => {
  return { type: LOAD_SKILLS, skills };
};

// const _deleteSkill = (client, skill) => {
//   return { type: DELETE_SKILL, client, skill };
// };

// const _deleteSkill = (client) => {
//   return { type: DELETE_SKILL, client };
// };

// const _addSkill = (client) => {
//   return { type: ADD_SKILL, client };
// };

const _updateClientSkill = (client) => {
  return { type: UPDATE_CLIENT_SKILL, client };
};

const _updateSkill = (skill) => {
  return { type: UPDATE_SKILL, skill };
};

//////////////////////////////////// THUNKS below:

export const loadClients = () => {
  return async (dispatch) => {
    const clients = (await axios.get("/api/clients")).data;
    dispatch(_loadClients(clients));
  };
};

export const loadSkills = () => {
  return async (dispatch) => {
    const skills = (await axios.get("/api/skills")).data;
    dispatch(_loadSkills(skills));
  };
};

// export const deleteSkill = (client) => {
//   return async (dispatch) => {
//     client = (await axios.put(`/api/clients/${client.id}`, client)).data;

//     dispatch(_deleteSkill(client));
//   };
// };

// export const deleteSkill = (client, skill) => {
//   return async (dispatch) => {
//     client = (await axios.put(`/api/clients/${client.id}`, client)).data;

//     dispatch(_deleteSkill(client, skill));
//   };
// };

// export const addSkill = (client) => {
//   return async (dispatch) => {
//     client = (await axios.put(`/api/clients/${client.id}`, client)).data;

//     dispatch(_addSkill(client));
//   };
// };

export const updateClientSkill = (client) => {
  return async (dispatch) => {
    client = (await axios.put(`/api/clients/${client.id}`, client)).data;

    dispatch(_updateClientSkill(client));
  };
};

export const updateSkill = (skill, history) => {
  return async (dispatch) => {
    skill = (await axios.put(`/api/skills/${skill.id}`, skill)).data;

    dispatch(_updateSkill(skill));
    history.push("/");
  };
};

//////////////////////////////////// REDUCERS below:

const clients = (state = [], action) => {
  switch (action.type) {
    case LOAD_CLIENTS:
      return action.clients;
    // case DELETE_SKILL:
    //   return [...state].map((client) =>
    //     client.id === action.client.id ? action.client : client
    //   );
    case UPDATE_CLIENT_SKILL:
      return [...state].map((client) =>
        client.id === action.client.id ? action.client : client
      );

    // case ADD_SKILL:
    //   return [...state]
    //     .filter((client) => client.id === action.client.id)
    //     .map((client) => {
    //       client.skills = [...client.skills, action.skill];
    //       return client;
    //     });

    default:
      return state;
  }
};

const skills = (state = [], action) => {
  switch (action.type) {
    case LOAD_SKILLS:
      return action.skills;

    case UPDATE_SKILL:
      return [...state].map((skill) =>
        skill.id === action.skill.id ? action.skill : skill
      );

    default:
      return state;
  }
};

const reducer = combineReducers({
  clients,
  skills,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
