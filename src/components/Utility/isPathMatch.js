import matchPath from "react-router/modules/matchPath";
import isObjectEmpty from "./isObjectEmpty";

const isPathMatch = (basePath)=>(targetPath) =>{
    return !isObjectEmpty(matchPath(targetPath, {path: basePath}))
  };

export default isPathMatch;
