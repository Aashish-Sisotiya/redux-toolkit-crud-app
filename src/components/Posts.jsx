import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, setEdit } from "../redux/features/PostSlice";
import Spinner from "./Spinner.jsx";
import { updatePost } from "../redux/features/PostSlice";

const Posts = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textBody, setTextBody] = useState("");
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

  const fetchHandler = (e) => {
    e.preventDefault();
    // console.log(id);
    if (!id) {
      window.alert("Please Enter Post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  const deleteHandler = () => {
    dispatch(deletePost({ id: post[0].id }));
    window.alert("Post Deleted");
    window.location.reload();
  };

  return (
    <div className="row d-flex align-items-center justify-content-center">
      <div className="col-md-8">
        <form action="">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Search by ID:
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              onClick={fetchHandler}
              type="button"
              className="btn btn-primary mt-4"
            >
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/createPost")}
              type="button"
              className="btn btn-warning ms-4 mt-4"
            >
              Create Post
            </button>
          </div>
        </form>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">{post[0].title}</h5>
                  {edit ? (
                    <>
                      <textarea
                        className="form-control"
                        value={textBody}
                        onChange={(e) => setTextBody(e.target.value)}
                        id="floatingTextarea"
                      />
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          onClick={() => {
                            dispatch(
                              updatePost({
                                id: post[0].id,
                                title: post[0].title,
                                body: textBody,
                              })
                            );
                            dispatch(setEdit({ edit: false, body: "" }));
                          }}
                          type="button"
                          className="btn btn-secondary"
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            dispatch(setEdit({ edit: false, body: "" }))
                          }
                          type="button"
                          className="btn btn-danger ms-4"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="card-text">{post[0].body}</p>
                    </>
                  )}
                  {!edit && (
                    <div className="d-flex align-items-end justify-content-end">
                      <button
                        onClick={() =>
                          dispatch(setEdit({ edit: true, body: post[0].body }))
                        }
                        type="button"
                        className="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={deleteHandler}
                        type="button"
                        className="btn btn-danger ms-4"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
