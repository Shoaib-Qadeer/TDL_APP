import React, { useState, useEffect } from "react";
import { Typography, Menu, MenuItem } from "@mui/material";

import { BiGridVertical } from "react-icons/bi";

const SingleItem = ({ todoitem, deletetodo, updatecompletion, undoupdate }) => {
  const [completed, setCompleted] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleComplete = () => {
    setCompleted(!completed);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
  };

  return (
    <div style={{}}>
      <div
        className="single"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
          flexDirection: "row",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <div
          className="itemtitlense"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {todoitem.Completed ? (
            <>
              <div
                className="roundcheck"
                style={{
                  backgroundColor: "#A89A83",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  undoupdate(todoitem._id);
                }}
              >
                <Typography
                  style={{
                    color: "white",
                  }}
                >
                  ✓
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div
                className="roundcheck"
                onClick={() => {
                  updatecompletion(todoitem._id);
                }}
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid grey",
                }}
              >
                <Typography
                  style={{
                    color: "white",
                  }}
                >
                  &nbsp;
                </Typography>
              </div>
            </>
          )}

          <div className="item_title" style={{ paddingLeft: "7px" }}>
            <Typography
              style={{
                color: "black",
              }}
            >
              {todoitem.title}
            </Typography>
          </div>
        </div>

        <div className="menu_icon" onClick={handleMenuOpen}>
          <BiGridVertical style={{ fontSize: "16px" }} />
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            // onClick={}
            // divider={true}
            onClick={() => {
              deletetodo(todoitem._id);
            }}
            sx={{
              fontSize: "12px",

              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            Delete
          </MenuItem>
          {/* <MenuItem
            onClick={handleDelete}
            sx={{
              fontSize: "12px",

              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            ENW
          </MenuItem> */}
        </Menu>
      </div>

      {todoitem.CompletionTime ? (
        <>
          <Typography style={{ fontSize: "9px", paddingLeft: "20px" }}>
            Completed at: {todoitem.CompletionTime.slice(0, 10)}
          </Typography>
        </>
      ) : (
        <>
          <Typography style={{ fontSize: "9px", paddingLeft: "20px" }}>
            Pending
          </Typography>
        </>
      )}
    </div>
  );
};

export default SingleItem;
