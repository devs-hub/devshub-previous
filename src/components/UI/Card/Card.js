import React, { useState } from "react";
import styles from "./Card.module.scss";
import { headingSecondary as HeadingSecondary } from "../Text/Text";
import SmallLink from "../Links/Small/SmallLink";
import Technology from "../Technology/Technology";
import { useEffect } from "react";

const Card = (props) => {
  const [isWordy, setWordy] = useState(false);
  // 250

  useEffect(() => {
    if (props.description.length > 250) {
      setWordy(true);
    } else {
      setWordy(false);
    }
  }, []);

  const description = isWordy ? (
    <p className={styles.card__descriptionText}>
      {props.description.substring(0, 250)}...{" "}
      <span onClick={props.handler} className={styles.card__descriptionSeemore}>
        see more
      </span>
    </p>
  ) : (
    <p className={styles.card__descriptionText}>{props.description}</p>
  );

  return (
    <div className={styles.card}>
      <div className={styles.card__heading}>
        <HeadingSecondary>{props.title}</HeadingSecondary>

        <SmallLink
          id={props.id}
          handler={props.handler}
          className="tertiaryOutline"
        >
          Explore
        </SmallLink>
      </div>
      <div className={styles.card__description}>
        <p className={styles.card__descriptionDesc}>
          {props.section} Description
        </p>
        {description}
      </div>
      <div className={styles.card__tech}>
        <Technology techUsed={props.techUsed} techNeeded={props.techNeeded} />
      </div>
    </div>
  );
};

export default Card;
