import styled from "styled-components"

function Error({props}) {
  return (
    <WrapperDiv>
      <Alert>!</Alert>
      <ErrorMessage>{props}</ErrorMessage>
    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  color: red;
  background-color: mistyrose;
  border-radius: 6px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`

const Alert = styled.span`
  background-color: white;
  height: 30px;
  width: 30px;
  border-radius: 25%;
  font-weight: bold;
  display: grid;
  place-content: center;
`

const ErrorMessage = styled.p`
  margin: 0;
`

export default Error