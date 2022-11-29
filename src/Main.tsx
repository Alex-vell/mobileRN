/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import {Note, NoteType} from './Note/Note';
import {MemoSvgArrowComponent} from './assets/arrowComponent';

export const Main: FC = () => {
  const [valueInputTitle, setValueInputTitle] = useState<string>('');
  const [valueInputDescription, setValueInputDescription] =
    useState<string>('');
  const [currentCommentTitle, setCurrentCommentTitle] = useState<string | null>(
    null,
  );
  const [currentCommentId, setCurrentCommentId] = useState<number | null>(null);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [isCollapseDesc, setCollapseDesc] = useState<boolean>(false);
  const [stateDeleteBtn, setStateDeleteBtn] = useState<boolean>(false);
  const [isTimer, setTimer] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<number>(5);

  const [notes, setNotes] = useState<Array<NoteType>>([
    {
      id: 1,
      title: 'React app',
      description:
        'library Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения ',
      date: '12.12.2022',
      comments: [
        {
          noteId: 1,
          id: 1231212,
          title: 'new comment',
          description: 'text comment fgff af af saf s',
          date: '12.12.2022 15:00',
          replies: [
            {
              commentId: 1231212,
              title: 'new comment',
              id: 12312121,
              description: 'bla ba bla',
              date: '12.12.2022 15:10',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Vue app',
      description: 'library',
      date: '13.12.2022',
      comments: [],
    },
    {
      id: 3,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 4,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 5,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 6,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 7,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 8,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 9,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
    {
      id: 10,
      title: 'Task',
      description:
        'Удаление заметки происходит свайпом влево, возле блока с заметкой должна появиться кнопка «Удалить», при нажатии на кнопку появляется иконка (на ваш вкус) с обратным отсчетом внутри (5 секунд), если до момента истечения отсчета нажать на иконку, то удаление заметки должно отмениться, в обратном случае заметка должна быть удалена.',
      date: '28.11.2022',
      comments: [],
    },
  ]);

  const removeNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  useEffect(() => {
    if (activeNote && stateDeleteBtn && isTimer) {
      const timeout = setTimeout(() => {
        removeNote(activeNote);
        setStateDeleteBtn(false);
        setTimer(false);
        setTimerCount(5);
      }, 5000);
      return () => {
        clearInterval(timeout);
      };
    }
  }, [stateDeleteBtn, activeNote, isTimer]);

  useEffect(() => {
    if (isTimer) {
      const interval = setInterval(() => {
        setTimerCount(timerCount - 1);
      }, 1000);
      return () => {
        clearTimeout(interval);
      };
    }
  }, [timerCount, isTimer]);

  const addNote = () => {
    const newNote = {
      id: new Date().getTime(),
      title: valueInputTitle,
      description: valueInputDescription,
      date: dayjs(new Date()).format('DD.MM.YYYY'),
      comments: [],
    };
    setNotes([newNote, ...notes]);
    setValueInputTitle('');
    setValueInputDescription('');
  };

  const addComment = (noteId: number) => {
    const newComment = {
      noteId: noteId,
      id: new Date().getTime(),
      title: valueInputTitle,
      description: valueInputDescription,
      date: dayjs(new Date()).format('DD.MM.YYYY HH:mm'),
      replies: [],
    };
    setNotes(
      notes.map(note =>
        note.id === noteId
          ? {...note, comments: [...note.comments, newComment]}
          : note,
      ),
    );
    setValueInputTitle('');
    setValueInputDescription('');
  };

  const addReply = (noteId: number, commentId: number) => {
    const newReply = {
      commentId: commentId,
      id: new Date().getTime(),
      title: valueInputTitle,
      description: valueInputDescription,
      date: dayjs(new Date()).format('DD.MM.YYYY HH:mm'),
    };
    setNotes(
      notes.map(note =>
        note.id === noteId
          ? {
              ...note,
              comments: note.comments.map(com =>
                com.id === commentId
                  ? {...com, replies: [...com.replies, newReply]}
                  : com,
              ),
            }
          : note,
      ),
    );
    setValueInputTitle('');
    setValueInputDescription('');
    setCurrentCommentTitle(null);
    setCurrentCommentId(null);
  };

  const collapseNote = (id: number) => {
    setActiveNote(id);
    setCollapseDesc(!isCollapseDesc);
  };
  //
  // const leftSwipe = () => {
  //     return <View style={{width: 1, backgroundColor: "red"}}></View>
  // }

  const onChangeHandler = () => {
    if (isCollapseDesc && activeNote && !currentCommentId) {
      addComment(activeNote);
    }
    if (isCollapseDesc && activeNote && currentCommentId) {
      addReply(activeNote, currentCommentId);
    }
    if (!isCollapseDesc && !activeNote && !currentCommentId) {
      addNote();
    }
  };

  const setCurrentCommentCallback = (
    commentId: number | null,
    title: string | null,
  ) => {
    setCurrentCommentId(commentId);
    setCurrentCommentTitle(title);
  };

  // const callback = () => {
  //     console.log("YEEEEEEEEE");
  // };
  // const gesture = Gesture.Tap().onBegin(callback);
  // gesture.onBegin(callback)

  const render: ListRenderItem<NoteType> = ({item}) => {
    return (
      <View>
        <Note
          item={item}
          collapseNote={collapseNote}
          stateDeleteBtn={stateDeleteBtn}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          isCollapseDesc={isCollapseDesc}
          setCollapseDesc={setCollapseDesc}
          setCurrentCommentCallback={setCurrentCommentCallback}
          setStateDeleteBtn={setStateDeleteBtn}
          setTimer={setTimer}
          isTimer={isTimer}
          timerCount={timerCount}
          setTimerCount={setTimerCount}
        />

        {/*</Swipeable>*/}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.noteList}>
        <FlatList
          data={notes}
          renderItem={render}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <View style={styles.form}>
        {isCollapseDesc && currentCommentId && currentCommentTitle && (
          <Text style={{marginTop: -30, marginLeft: -100}}>
            Ответ на комментарий - {currentCommentTitle}
          </Text>
        )}
        <TextInput
          style={styles.titleInput}
          value={valueInputTitle}
          onChangeText={setValueInputTitle}
          placeholder={'Название'}
          maxLength={25}
        />

        <View style={styles.addDescBlock}>
          <TextInput
            style={styles.descriptionInput}
            value={valueInputDescription}
            onChangeText={setValueInputDescription}
            placeholder={'Текст описания'}
          />
          <TouchableOpacity
            style={styles.addNoteBtn}
            // onPress={ addNote}
            onPress={onChangeHandler}>
            <View style={styles.arrowWrap}>
              <MemoSvgArrowComponent />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // marginTop: 35,
    paddingHorizontal: 30,
    width: '100%',
    // overflow: "scroll"
  },
  noteList: {
    // marginTop: "40%",
    // maxHeight: 400,
    // backgroundColor: "red"
    // position: "absolute",
    // left: "5%",
    // top: 40,
    // width: "100%"
  },
  form: {
    // position: "absolute",
    // bottom: "10%",
    // left: "5%",
    // position: "absolute",
    // bottom: -20,
    // left: 0,
    marginBottom: 40,
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    height: 82,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0, 0.2)',
    paddingRight: 27,
  },
  titleInput: {
    borderBottomColor: '#D2D2D2',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    width: '100%',
    height: 36,
  },
  addDescBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 36,
  },
  descriptionInput: {
    // width: "100%",
    height: 36,
  },
  addNoteBtn: {
    width: '10%',
    height: 36,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowWrap: {
    paddingTop: 28.74,
    // paddingRight: 28.74,
    // paddingBottom: 28.74,
    transform: [{rotate: '270deg'}],
  },
});
