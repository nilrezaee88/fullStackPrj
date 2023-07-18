import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Modal } from "react-bootstrap";
import { deletePost } from "../statemangagment/apiSlice";
import { archiveData, setData } from "../statemangagment/postSlice";
import "../styles/custom.css";
import { allTexts } from "../constants/allTexts";
import { ModalComponent } from "../components";

function Feeds() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.api.posts);
  const [deleteModal, setDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(setData(posts));
  }, [posts, dispatch]);

  const handleDelete = (postId) => {
    setPostIdToDelete(postId);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deletePost(postIdToDelete));
    setDeleteModal(false);
  };

  const handleArchive = (postId) => {
    // Archive logic goes here
    dispatch(archiveData(postId));
    dispatch(deletePost(postId));
  };

  const handleDeliver = (postId) => {
    // Deliver logic goes here
    console.log(`Delivering post with ID: ${postId}`);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center pt-5 mt-5">
      {posts.map((post) => (
        <div key={post.id} className="w-50 py-2">
          <Card className="d-flex flex-column align-items-center">
            <Card.Img
              variant="top"
              src={post.avatar}
              alt={post.last_name}
              className="w-100 py-2"
            />
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Text className="px-5">{allTexts.defualtText}</Card.Text>
              <div className="btn-group">
                <Button
                  variant="danger"
                  className="rounded"
                  onClick={() => handleDelete(post.id)}>
                    {allTexts.delete}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleArchive(post.id)}
                  className="mx-5 rounded"
                >
                  {allTexts.archive}
                </Button>
                <Button
                  variant="success"
                  className="rounded"
                  onClick={() => handleDeliver(post.id)}>
                  {allTexts.deliver}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      {/* Delete Confirmation Modal */}
      <ModalComponent
        headTitle={allTexts.conform_del}
        body={allTexts.delete_msg}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}

export default Feeds;
