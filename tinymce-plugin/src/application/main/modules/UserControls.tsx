import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Button, OutlineButton } from '../../components/Button'

interface UserControlsProps {
  cancelAction: () => void
  applyAction: () => void
  applyText?: string
  applyDisabled?: boolean
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