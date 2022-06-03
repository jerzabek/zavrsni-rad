import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Button, OutlineButton, RedButton } from '../../components/Button'

interface UserControlsProps {
  cancelAction: () => void
  applyAction: () => void
  applyText?: string
  applyDisabled?: boolean
}

interface UserControlsWithDeleteProps extends UserControlsProps {
  removeAction: () => void
}

const OutlineButtonMargin = styled(OutlineButton)`
margin-right: 1rem;
`

const ButtonContainer = styled.div`
text-align: end;
`

export default function UserControls({ cancelAction, applyAction, applyText = 'Annotate', applyDisabled }: UserControlsProps): ReactElement {
  return (
    <ButtonContainer>
      <OutlineButtonMargin onClick={cancelAction}>Cancel</OutlineButtonMargin>
      <Button disabled={applyDisabled} onClick={applyAction}>{applyText}</Button>
    </ButtonContainer>
  )
}

export function UserControlsWithDelete({ cancelAction, removeAction, applyAction, applyText = 'Annotate', applyDisabled }: UserControlsWithDeleteProps): ReactElement {
  return (
    <ButtonContainer>
      <OutlineButtonMargin onClick={cancelAction}>Cancel</OutlineButtonMargin>
      <RedButton onClick={removeAction}>Remove</RedButton>
      <Button disabled={applyDisabled} onClick={applyAction}>{applyText}</Button>
    </ButtonContainer>
  )
}