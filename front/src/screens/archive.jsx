import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { allTexts } from "../constants/allTexts";

function Archive() {
  const archiveList = useSelector((state) => state.post.archivePost);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center pt-5 mt-5">
      {archiveList.length === 0 ? (
        <div>{allTexts.there_is_not_archive_post}</div>
      ) : (
        archiveList.map((post) => (
          <div key={post.id} className="w-50 py-2">
            <Card className="d-flex flex-column align-items-center">
              <Card.Img
                variant="top"
                src={post.avatar}
                alt={post.last_name}
                className="w-75 py-2"
              />
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Text className="px-5">{allTexts.defualtText}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}

export default Archive;
