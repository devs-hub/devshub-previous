import { useHistory, useRouteMatch } from "react-router-dom";

import Card from "../../../../../components/UI/Card/Card";
import React from "react";

const Section = React.memo((props) => {
  const history = useHistory();
  const match = useRouteMatch("/home/:section");

  const sectionSelectedHandler = (event, projectId) => {
    history.push(`/home/${match.params.section}/${projectId}`);
  };

  const view = props.cards.map((card, index) => {
    return (
      <React.Fragment key={index}>
        {card.docs.map((doc, index) => {
          return (
            <Card
              key={index}
              handler={sectionSelectedHandler}
              title={doc.title}
              id={doc.id}
              description={doc.description}
              tech={doc.techArr}
            />
          );
        })}
      </React.Fragment>
    );
  });

  return <div>{view}</div>;
});

export default Section;
