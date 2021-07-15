import { EthereumConnectionButton } from './ethereum';
import { TezosConnectionButton } from './tezos';
import { Box, Card } from '@material-ui/core';
// import { Step, StepLabel, Stepper } from '@material-ui/core';
// import CustomStepIcon from '../stepper/CustomStepIcon';

export default function MultiConnect() {


  return (
    <Card>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        m: 2
      }}>
        <TezosConnectionButton />
        <EthereumConnectionButton />
      </Box>
    </Card>
  )
}