import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  overflow: hidden;
  overflow-y: auto;
`;

export const ImageBox = styled.div`
  max-width: calc(100vw - 50px);
  max-height: calc(100vh - 100px);
  display: block;
  width: 60vw;
  margin: auto;
`;