import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react';
import { TaskCard } from 'src/components/cards/TaskCard';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledIconsComments } from './CommentCard.styles';

type CommentCardType = {
  id: string;
  value?: string | null;
  readOnly: boolean,
  onSave: (comment: string) => void;
};

export const CommentCard = ({
  id,
  value,
  readOnly,
  onSave,
}: CommentCardType) => {
  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState<string | undefined>(value ?? '');

  useEffect(() => {
    setComment(value ?? '');
  }, [value]);

  const isReadOnly = () => {
    if (readOnly) {
      return true;
    }

    return !editMode;
  };

  const cancelEdit = () => {
    setEditMode(false);
    setComment(value ?? '');
  };

  const sendComment = () => {
    onSave(comment ?? '');
    setEditMode(false);
  };

  const renderCommentsCommands = () => {
    if (editMode) {
      return (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <Stack.Item>
            <StyledIconsComments>
              <IconButton
                id={`${id}_SaveIcon`}
                iconProps={{ iconName: 'Save' }}
                onClick={sendComment}
                title="Save"
              />
              <Text
                id={`${id}_SaveLink`}
                style={{ cursor: 'pointer' }}
                variant="small"
                onClick={sendComment}
              >
                Save
              </Text>
            </StyledIconsComments>
          </Stack.Item>
          <Stack.Item>
            <StyledIconsComments>
              <IconButton
                id={`${id}_CancelIcon`}
                iconProps={{ iconName: 'Cancel' }}
                onClick={cancelEdit}
                title="Cancel"
              />
              <Text
                id={`${id}_CancelLink`}
                style={{ cursor: 'pointer' }}
                variant="small"
                onClick={cancelEdit}
              >
                Cancel
              </Text>
            </StyledIconsComments>
          </Stack.Item>
        </Stack>
      );
    }
    if (!readOnly) {
      return (
        <IconButton
          id={`${id}_Edit`}
          iconProps={{ iconName: 'EditSolid12' }}
          onClick={() => setEditMode(!readOnly)}
          title="Edit"
        />
      );
    }
    return null;
  };

  return (
    <TaskCard
      id={id}
      title="Comments"
      commands={renderCommentsCommands()}
    >
      <Spacing margin={{ top: 'normal' }}>
        <TextField
          id={`${id}_TextField`}
          multiline
          borderless={true}
          readOnly={isReadOnly()}
          resizable={false}
          value={comment}
          rows={7}
          onChange={(event, newValue) => setComment(newValue ?? '')}
        />
      </Spacing>
    </TaskCard>
  );
};
