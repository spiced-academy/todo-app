import { Checkbox, Editable, Flex, Input, EditableInput, EditablePreview, HStack, IconButton, ListItem, Spacer, Divider, Select } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { User } from "@prisma/client";

interface TaskItemProps {
    key: string;
    task: Task;
    users: User[];
    handleCompletedTask: (taskId: string) => void;
    handleEditTask: (taskId: string, newTitle: string) => void;
    handleAssignTask: (taskId: string, userId: string) => void;
    handleDeleteTask: (taskId: string) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, handleDeleteTask, handleCompletedTask, handleEditTask, handleAssignTask, users }) => {
    return (
        <ListItem key={task.id}>
            <Flex alignItems="center">
                <HStack spacing="12px">
                    <Checkbox
                        colorScheme="teal"
                        key={task.id}
                        isChecked={task.completed === true}
                        onChange={() => handleCompletedTask(task.id)}
                    ></Checkbox>

                    <Editable

                        defaultValue={task.title}
                        onSubmit={(nextValue) => handleEditTask(task.id, nextValue)}
                    >
                        {task.completed ? (
                            <EditablePreview as="del" />
                        ) : (
                            <EditablePreview />
                        )}
                        <Input
                            as={EditableInput}
                            focusBorderColor="teal.400"
                            size="sm"
                        />
                    </Editable>
                </HStack>
                <Spacer />
                <Select value={task.user_id || "null"} size="xs" onChange={(event) => handleAssignTask(task.id, event.target.value)} placeholder="Assign user" width={200} >
                    <option value="null">Public</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id} >
                            {user.id === task.user_id ? 'me' : user.name}
                        </option>
                    ))}
                </Select>
                <Spacer />
                <IconButton
                    aria-label="Delete a task"
                    size="xs"
                    color="red.300"
                    margin="10px"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteTask(task.id)}
                />
            </Flex>
            <Divider />
        </ListItem>
    )
}

export default TaskItem;