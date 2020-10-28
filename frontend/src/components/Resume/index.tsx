import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core';

type ResumeProps = {
  open: boolean;
  onClose: () => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    buttonDefault: {
      backgroundColor: '#24806F',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#24806F',
      },
    },
  }),
);

export default function Resume({ open, onClose }: ResumeProps) {
  const classes = useStyles();
  const [scroll] = React.useState<DialogProps['scroll']>('paper');

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Future environmental and agricultural impacts of Brazil’s Forest Code
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            align={'justify'}
          >
            This application presents the main results of the article{' '}
            <strong>
              <a
                href="https://iopscience.iop.org/article/10.1088/1748-9326/aaccbb"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Soterroni et al. Future environmental and agricultural impacts
                of Brazil’s Forest Code, Environmental Research Letters, 13(7),
                p.074021 (2018)
              </a>
            </strong>
            . It shows two scenarios: FC and NoFC. FC is a command-and-control
            scenario that attempts to capture the future impacts of all key
            provisions of a rigorously enforced Brazil’s Forest Code. It
            includes the full control of illegal deforestation after 2010, the
            amnesty of LR debts for small farms (SFA) before 2010, the
            environmental reserve quota mechanism after 2020, and the mandatory
            restoration of LR debts after 2020. Legal deforestation or
            conversion of LR surpluses is allowed at all times in all biomes,
            with the exception of the Atlantic Forest, which is protected by
            more restrictive legislation. The LR debts not waived by the SFA are
            fully paid by the farm owner, either by purchasing CRA quotas from
            the LR surpluses in the same biome or by taking illegally converted
            areas out of agricultural production for native vegetation
            restoration. The no forest code (NoFC) scenario allows both legal
            and illegal deforestation at all times, which is driven by the
            demand for agricultural commodities, and does not include any policy
            restrictions.
          </DialogContentText>
          <DialogContentText variant="h6" style={{ marginBottom: '0' }}>
            RESTORE+
          </DialogContentText>
          <DialogContentText variant="subtitle1" style={{ marginBottom: '0' }}>
            You can download the data used in this application by{' '}
            <a
              href="https://www.dropbox.com/s/aj1rwz3bu9td66n/restoreplus.zip?raw=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              clicking here
            </a>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} className={classes.buttonDefault}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
