import styled from 'styled-components'

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 50px;

  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const ModalContent = styled.div`
  max-width: 90vw;
  width: 60rem;
  padding: 2rem;
  margin: 0 auto;

  background-color: #fff;
  background-radius: 10px;

  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`