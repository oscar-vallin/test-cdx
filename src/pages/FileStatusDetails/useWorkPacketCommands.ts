/* eslint-disable react-hooks/exhaustive-deps */
import {
  GenericResponse,
  GqOperationResponse,
  ReprocessResponse,
  useWorkPacketCancelMutation,
  useWorkPacketContinueMutation,
  useWorkPacketDeleteMutation,
  useWorkPacketRenameAndReprocessMutation,
  useWorkPacketReprocessMutation,
  useWorkPacketResendMutation,
  useReprocessDialogLazyQuery,
  useWorkPacketRerunStepMutation,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useEffect } from 'react';
import { useNotification } from 'src/hooks/useNotification';

export const useWorkPacketCommands = (workOrderId: string) => {
  const [apiCallDelete, { data: deleteData, error: deleteError }] = useWorkPacketDeleteMutation({
    variables: {
      workOrderId,
    },
  });
  const [apiCallContinue, {
    data: continueData, error: continueError,
  }] = useWorkPacketContinueMutation({
    variables: {
      workOrderId,
    },
  });
  const [apiCallCancel, { data: cancelData, error: cancelError }] = useWorkPacketCancelMutation({
    variables: {
      workOrderId,
    },
  });
  const [apiCallReprocess, {
    data: reprocessData, error: reprocessError,
  }] = useWorkPacketReprocessMutation({
    variables: {
      workOrderId,
    },
  });
  const [apiCallRerun, { data: rerunData, error: rerunError }] = useWorkPacketRerunStepMutation();

  const [
    apiCallReprocessDialog,
    { error: reprocesDialogError },
  ] = useReprocessDialogLazyQuery({
    variables: {
      workOrderId,
    },
  });

  const [apiCallRenameReprocess, {
    data: renameReprocessData, error: renameReprocessError,
  }] = useWorkPacketRenameAndReprocessMutation();

  const [apiCallResend, { data: resendData, error: resendError }] = useWorkPacketResendMutation({
    variables: {
      workOrderId,
    },
  });

  const Toast = useNotification();
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(deleteError);
  }, [deleteError]);

  useEffect(() => {
    handleError(continueError);
  }, [continueError]);

  useEffect(() => {
    handleError(cancelError);
  }, [cancelError]);

  useEffect(() => {
    handleError(reprocessError);
  }, [reprocessError]);

  useEffect(() => {
    handleError(renameReprocessError);
  }, [renameReprocessError]);

  useEffect(() => {
    handleError(resendError);
  }, [resendError]);

  useEffect(() => {
    handleError(reprocesDialogError);
  }, [reprocesDialogError]);

  useEffect(() => {
    handleError(rerunError);
  }, [rerunError]);

  const handleGenericResponse = (response?: GenericResponse | null, successMsg?: string) => {
    switch (response?.response) {
      case GqOperationResponse.Success:
        Toast.success({ text: successMsg });
        break;
      case GqOperationResponse.PartialSuccess:
        Toast.warning({ text: response?.errMsg });
        break;
      case GqOperationResponse.Fail:
        Toast.error({ text: response?.errMsg });
        break;
      default:
        break;
    }
  };

  const handleReprocessResponse = (response?: ReprocessResponse | null, successMsg?: string) => {
    switch (response?.response) {
      case GqOperationResponse.Success:
        Toast.success({ text: successMsg });
        break;
      case GqOperationResponse.PartialSuccess:
        Toast.warning({ text: response?.errMsg });
        break;
      case GqOperationResponse.Fail:
        Toast.error({ text: response?.errMsg });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleGenericResponse(deleteData?.workPacketDelete, 'Work Packet Deleted');
  }, [deleteData]);

  useEffect(() => {
    handleGenericResponse(continueData?.workPacketContinue, 'Continue processing has been requested');
  }, [continueData]);

  useEffect(() => {
    handleGenericResponse(cancelData?.workPacketCancel, 'Cancelling processing has been requested');
  }, [cancelData]);

  useEffect(() => {
    handleGenericResponse(resendData?.workPacketResend, 'Resending file has been requested');
  }, [resendData]);

  useEffect(() => {
    handleReprocessResponse(reprocessData?.workPacketReprocess, 'Work Packet is being reprocessed');
  }, [reprocessData]);

  useEffect(() => {
    handleReprocessResponse(renameReprocessData?.workPacketRenameAndReprocess, 'Work Packet is being reprocessed');
  }, [renameReprocessData]);

  useEffect(() => {
    handleGenericResponse(rerunData?.workPacketRerunStep, 'Re-running step has been requested');
  }, [rerunData]);

  return {
    apiCallDelete,
    apiCallContinue,
    apiCallCancel,
    apiCallReprocess,
    apiCallRenameReprocess,
    apiCallResend,
    apiCallReprocessDialog,
    apiCallRerun,
  };
};
