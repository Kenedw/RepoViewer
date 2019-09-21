import styled, { keyframes } from 'styled-components';

import { rgbToyiq } from '../../services/utils';

const blackPulse = keyframes`
  from {
    fill: #FFF;
    transform: scale(0.8);
  }
  to {
    fill: #000;
    transform: scale(1.5);
  }
`;

export const Loading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 12vh;
    height: 12vh;
    animation: ${blackPulse} 1s alternate-reverse infinite;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    align-self: flex-start;
    color: #615f69;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    display: flex;
  }

  img {
    width: 120px;
    border-radius: 50%;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 40px;
      height: 40px;
      padding: 1px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #615f69;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Label = styled.span.attrs(props => ({
  color: rgbToyiq(props.background) >= 128 ? 'black' : 'white',
}))`
  background: ${props => `#${props.background}`};
  color: ${props => props.color};
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
`;

export const SearchMenu = styled.div`
  display: flex;
  justify-content: center;

  button {
    padding: 10px;
    border: none;
    border-radius: 6px;
    text-decoration: none;
    font-size: 16px;

    &[select] {
      background: green;
      color: white;
    }

    & + button {
      margin-left: 10px;
    }
  }
`;
