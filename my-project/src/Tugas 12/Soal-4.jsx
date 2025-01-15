import { createBrowserRouter, RouterProvider } from "react-router-dom";

function Profile({userid}) {
    return (
        <div>
            <h2>Profile</h2>
            <p>UserID: {userid}</p>
        </div>
    );
}