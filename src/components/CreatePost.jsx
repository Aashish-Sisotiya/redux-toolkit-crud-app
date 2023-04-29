import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { title, body } = values;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => ({ ...state.app }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <h1 className="text-center bg-dark text-white p-2">Create Post</h1>
      <form>
        <div className="mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Post Title"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <div className="form-floating mt-4">
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
              placeholder="Enter Post description"
              id="floatingTextarea"
            />
            <label htmlFor="floatingTextarea">Enter Post description</label>
          </div>
        </div>
        <div className="d-flex align-items-end justify-content-end">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="btn btn-primary"
          >
            Go Home
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-danger ms-4"
          >
            Submit
          </button>
        </div>
      </form>
      {showPost && <div>{showCreatedPost()}</div>}
    </div>
  );
};

export default CreatePost;
