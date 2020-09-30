import React, {useState, useEffect, useParams} from "react";

export default function VideoCreate() {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email" />
            </div>
        </div>
    )
}
