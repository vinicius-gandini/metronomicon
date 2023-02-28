import type { NextPage } from 'next'
import { Container, Flex, Heading, Text, VStack, IconButton, Checkbox, HStack, CloseButton } from '@chakra-ui/react'
import { MdPlayArrow, MdPause, MdMenu, MdSettings } from 'react-icons/md';

import '../styles/pages/Home.module.scss'
import { MetronomeSlider } from '../components/Slider'
import { useCallback, useContext, useEffect, useState } from 'react';
import { BpmContext } from '../contexts/BpmContext';
import { Menu } from '../components/Menu';

let compassTimer: NodeJS.Timer;

const Home: NextPage = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [markFirstTick, setMarkFirstTick] = useState(true);
  const [compassCounter, setCompassCounter] = useState(0)
  const [strongPulse, setStrongPulse] = useState<HTMLAudioElement>();
  const [weakPulse, setWeakPulse] = useState<HTMLAudioElement>();

  const { bpm, beats } = useContext(BpmContext);

  const playBpmPulse = useCallback(() => {
    setCompassCounter(prevState => {
      if (prevState === beats || prevState === 0) {
        markFirstTick ?
          strongPulse?.play()
          : weakPulse?.play();
        return prevState = 1
      } else {
        weakPulse?.play();
        return prevState + 1
      }
    });
  }, [strongPulse, weakPulse, markFirstTick, beats]);

  const startMetronome = useCallback(() => {
    setIsPlaying(true)
  }, [playBpmPulse])

  const pauseMetronome = useCallback(() => {
    setIsPlaying(false);
    clearInterval(compassTimer);
    setCompassCounter(0);
  }, [playBpmPulse])

  useEffect(() => {
    setStrongPulse(new Audio('/audio/metronome-2khz-strong-pulse.flac'))
    setWeakPulse(new Audio('/audio/metronome-1khz-weak-pulse.flac'))
  }, [])

  useEffect(() => {
    if (isPlaying) compassTimer = setInterval(playBpmPulse, (60 / bpm) * 1000)
  }, [isPlaying])

  return (
    <Container maxWidth="full" padding={0} background="#f2f2f2">
      <Flex height="100vh" direction="column" justifyContent="center" alignItems="center">
        <VStack spacing={10}>
          <Heading size="3xl">Metronomicon</Heading>
          <VStack
            height="500px"
            width="400px"
            background="white"
            alignItems="center"
            justifyContent='space-between'
            borderRadius={20}
            boxShadow="lg"
            position="relative"
            padding={10}>
            <Menu />
            <HStack
              wrap="wrap"
              align="center"
              justify="center"
              spacing="0.25rem"
              height="80px">
              {Array.from(Array(beats)).map((beat, index) =>
                <IconButton
                  key={beat}
                  cursor="default"
                  colorScheme={compassCounter === index + 1 ? "purple" : "gray"}
                  isRound={true}
                  aria-label='Beats'
                  icon={<p>{index + 1}</p>} />)
              }
            </HStack>
            <MetronomeSlider isDisabled={isPlaying} />
            {isPlaying ? <IconButton
              aria-label='Search database'
              icon={<MdPause />}
              size='lg'
              colorScheme='purple'
              onClick={pauseMetronome}
              borderRadius='50%'
            /> :
              <IconButton
                aria-label='Search database'
                icon={<MdPlayArrow />}
                size='lg'
                colorScheme='purple'
                onClick={startMetronome}
                borderRadius='50%'
              />}
            <Checkbox
              isDisabled={isPlaying}
              colorScheme='purple'
              defaultChecked
              onChange={(e) => setMarkFirstTick(e.target.checked)}
            >
              Set first beat
            </Checkbox>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  )
}

export default Home
