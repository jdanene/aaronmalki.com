const RBTree = require('bintrees').RBTree;

/**
 *
 * @param comparator - 0 if a == b
 * 0 if a > b
 * <0 if a < b

 * @return {function(*=, *=): void}
 */
const insertIntoBinaryTree = (comparator) => (aTree, value) => {


    if (aTree === null || aTree === undefined) {
        let tree = new RBTree(comparator);
        let isSuccess = tree.insert(value);
        return {isSuccess,tree};
    } else {
        let isSuccess = aTree.insert(value);
        return {isSuccess,tree: aTree};
    }


};


const blogComparator = (a, b) => {
    return a.dateObj - b.dateObj;
};
const _insertIntoBlogBinaryTree = insertIntoBinaryTree(blogComparator);
export const insertIntoBlogBinaryTree = (aTree, blogPost) => {

    const {isSuccess, tree} = _insertIntoBlogBinaryTree(aTree, blogPost);
    if (isSuccess){
        return tree
    }else{
        blogPost.dateObj.setSeconds(blogPost.dateObj.getSeconds()+1);
        return insertIntoBlogBinaryTree(tree,blogPost)
    }

};

