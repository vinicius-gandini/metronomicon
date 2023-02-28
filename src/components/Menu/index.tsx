import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  useNumberInput,
  HStack,
  Button,
  Input,
} from '@chakra-ui/react'
import { useContext, useEffect } from 'react';
import { MdSettings } from 'react-icons/md'
import { BpmContext } from '../../contexts/BpmContext';

export const Menu = () => {
  const { handleChangeBeats } = useContext(BpmContext);

  const { value, getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 4,
      min: 2,
      max: 12,
      precision: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {
    handleChangeBeats(Number(value));
  }, [value, handleChangeBeats])

  return (
    <Popover
      placement='right-start'
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <IconButton aria-label='Open Menu' icon={<MdSettings />}
          variant="ghost"
          colorScheme="gray"
          position="absolute"
          alignSelf="flex-end"
          size="md"
          top="12px"
          right="4px"
          isRound={true}
          fontSize="24px" />
      </PopoverTrigger>
      <PopoverContent bg='white' borderColor='purple'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          Settings
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Beats
          <HStack maxW='200px'>
            <Button {...inc}>+</Button>
            <Input {...input} />
            <Button {...dec}>-</Button>
          </HStack>
        </PopoverBody>
        <PopoverFooter
          border='0'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          pb={4}
        >
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}