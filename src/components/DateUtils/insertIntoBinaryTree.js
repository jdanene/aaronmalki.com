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
        var tree = new RBTree(comparator);
        tree.insert(value);
        return tree;
    }else{
            aTree.insert(value);
    return aTree;
    }


};


const blogComparator = (a, b) => {
    return a.dateObj - b.dateObj;
};
const _insertIntoBlogBinaryTree = insertIntoBinaryTree(blogComparator);
export const insertIntoBlogBinaryTree = (aTree, blogPost) => {

    return _insertIntoBlogBinaryTree(aTree, blogPost)
};

