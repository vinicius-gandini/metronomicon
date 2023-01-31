import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { MdGraphicEq } from 'react-icons/md';
import { BpmContext } from '../../contexts/BpmContext'

interface SliderProps {
  isDisabled: boolean;
}

export const MetronomeSlider = ({ isDisabled }: SliderProps) => {
  const { bpm, handleChangeBpm } = useContext(BpmContext);

  return (
    <Slider
      value={bpm}
      colorScheme='purple'
      aria-label='slider-ex-6'
      min={40} max={240}
      onChange={(val) => handleChangeBpm(val)}
      isDisabled={isDisabled}
    >
      <SliderMark
        value={bpm}
        textAlign='center'
        display='flex'
        alignItems='center'
        justifyContent='center'
        bg='purple.300'
        color='white'
        borderRadius='50%'
        mt='-16'
        ml='-5'
        w='12'
        h='12'
        boxShadow='base'
      >
        {bpm}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6}>
        <Box color='purple' as={MdGraphicEq} />
      </SliderThumb>
    </Slider>
  )
}