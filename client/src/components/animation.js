import React from "react";

function animation() {
  return (
    <div className="home-animation">
      <video
        data-testid="video"
        width="800"
        height="700"
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
    </div>
  );
}

export default animation;
