---
title: Pass Props Back Up To Parent
draft: true
---

- Create a state for it in the parent folder such as [showModal, setShowModal]
- create an event handler function for it in the component
- const handleClose = () => {setShowModal(false)}
- pass the handleClose function into the child component
- <Modal handleClose={handleClose} />
- In the child prop: add the handleClose function to the destructured props list
- add a button and pass handleClose into the onClick handler of the button
