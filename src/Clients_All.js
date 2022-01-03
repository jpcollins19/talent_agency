import { connect } from "react-redux";
import { HashRouter as Router, Link } from "react-router-dom";

const Clients_All = ({ clients }) => {
  return (
    <div>
      <h2>Clients</h2>
      <Router>
        {clients.map((client) => (
          <div key={client.id}>
            <Link to={`/clients/${client.id}`}>
              {client.name} ({client.skills.length})
            </Link>
          </div>
        ))}
      </Router>
    </div>
  );
};

export default connect((state) => state)(Clients_All);
