import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={660}
      height={550}
      viewBox="0 0 660 550"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="42" cy="26" r="27" />
      <rect x="93" y="8" rx="2" ry="2" width="140" height="10" />
      <rect x="105" y="32" rx="2" ry="2" width="81" height="6" />
      <rect x="8" y="105" rx="2" ry="2" width="460" height="400" />
      <rect x="10" y="59" rx="0" ry="0" width="398" height="30" />
      <rect x="132" y="81" rx="0" ry="0" width="16" height="2" />
      <rect x="88" y="78" rx="0" ry="0" width="16" height="4" />
    </ContentLoader>
  );
};
