import {
  headingSecondary as HeadingSecondary,
  link as Link,
  paragraph as Paragraph,
  pre as Pre
} from "../../../UI/Text/Text";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  faArrowCircleLeft,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import Add from "../Add/Add";
import { AuthContext } from "../../../../helper/Auth";
import Button from "../../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headingTertiary as HeadingTertiary } from "../../../UI/Text/Text";
import Spinner from "../../../UI/Spinner/Spinner";
import Technology from "../../../UI/Technology/Technology";
import TextInput from "../../../../components/UI/Inputs/TextInput/TextInput";
import styles from "./UserPost.module.scss";
import usePost from "../../../../hooks/usePost";
import useRemoveRequestToJoin from "../../../../hooks/useRemoveRequestToJoin";
import useSendRequestToJoin from "../../../../hooks/useSendRequestToJoin";

const UserPost = React.memo((props) => {
  const { currentUser } = useContext(AuthContext);

  const history = useHistory();
  const match = useRouteMatch("/home/:section/:postId");

  const [post, setPost] = useState({
    title: "",
    description: "",
    owner: "Sulaiman",
    requirements: "",
    techArr: [],
    repo: "",
    users: []
  });
  const [showAdd, setShowAdd] = useState(false);
  const { isLoading, isError, data, error } = usePost(
    match.params.section,
    match.params.postId
  );

  const [sendJoinRequest, sendJoinRequestInfo] = useSendRequestToJoin(
    match.params.section,
    match.params.postId
  );
  const [removeJoinRequest, removeJoinRequestInfo] = useRemoveRequestToJoin(
    match.params.section,
    match.params.postId
  );

  useEffect(() => {
    if (!isLoading) {
      setPost(data);
    }
  });

  const goBackHandler = () => {
    history.goBack();
  };

  const goToUserHandler = () => {
    history.push("/profile/" + post.ownerId);
  };

  const editPostHandler = () => {
    setShowAdd((prevState) => !prevState);
  };

  const joinPostHandler = () => {
    sendJoinRequest({ ownerId: currentUser.ownerId, name: currentUser.name });
  };

  const leavePostHandler = () => {
    removeJoinRequest({ ownerId: currentUser.ownerId, name: currentUser.name });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      {showAdd ? (
        <Add
          handler={editPostHandler}
          post={post}
          section={match.params.section}
          postId={match.params.postId}
        />
      ) : null}
      <div className={styles.post}>
        <div className={styles.post__top}>
          <FontAwesomeIcon
            onClick={goBackHandler}
            className={styles.post__topIcon}
            icon={faArrowCircleLeft}
            size='3x'
          />
          <div className={styles.post__topRequest}>
            {post.users.some((user) => user.ownerId === currentUser.ownerId) ? (
              <FontAwesomeIcon
                onClick={leavePostHandler}
                className={styles.post__topCheck}
                icon={faCheckCircle}
                size='3x'
              />
            ) : currentUser.ownerId === post.ownerId ? (
              <Button
                handler={editPostHandler}
                category='primary'
                type='button'
                size='small'
                label='Edit Post'
              />
            ) : (
              <Button
                handler={joinPostHandler}
                category='tertiary'
                label='Send Request'
                size='small'
                type='button'
              />
            )}
          </div>
        </div>

        <div className={styles.post__details}>
          <div className={styles.post__left}>
            <div className={styles.post__leftHeading}>
              <HeadingSecondary>{post.title}</HeadingSecondary>
            </div>
            <Pre>{post.description}</Pre>
          </div>

          <div className={styles.post__right}>
            <Paragraph
              handler={goToUserHandler}
              className='link'
              handler={goToUserHandler}
            >
              {post.name}
            </Paragraph>

            <p className={styles.post__text}>
              Developers: {post.numOfDevelopers}
            </p>
            <p className={styles.post__text}>
              Developers needed: {post.numOfDevelopersNeeded}
            </p>
            {post.repo ? <Link link={post.repo}>Go to Repository</Link> : null}
            {post.challenge ? (
              <Link link={post.challenge}>Go to Challenge</Link>
            ) : null}
          </div>
        </div>

        <div className={styles.post__req}>
          <HeadingTertiary>Requirements</HeadingTertiary>
          <Pre>{post.requirements}</Pre>
        </div>
        <div className={styles.post__tech}>
          <Technology tech={post.techArr} />
        </div>
      </div>
    </React.Fragment>
  );
});

export default UserPost;
