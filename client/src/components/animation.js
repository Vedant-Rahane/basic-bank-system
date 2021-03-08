import React from "react";

function animation() {
  return (
      <video
        data-testid="video"
        className="home-animation"
        autoPlay={true}
        loop={true}
        muted={true}
        poster="true"
      >
        <source
          src="https://plaid.com/assets/video/homepage-hero.webm"
          type="video/webm"
        />
      </video>
  );
}

export default animation;
