/* eslint-disable @typescript-eslint/no-shadow */
import React, {FC, memo} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MemoSvgArrowComponent} from '../../assets/arrowComponent';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {MemoRotateSvgComponent} from '../../assets/rotateSVGComponent';
import {Comment} from './Comment/Comment';

export type ReplyType = {
  commentId: number;
  title: string;
  id: number;
  description: string;
  date: string;
};

export type CommentType = {
  noteId: number;
  id: number;
  title: string;
  description: string;
  date: string;
  replies: ReplyType[];
};

export type NoteType = {
  id: number;
  title: string;
  description: string;
  date: string;
  comments: CommentType[];
};

type NotePropsType = {
  item: NoteType;
  collapseNote: (id: number) => void;
  stateDeleteBtn: boolean;
  activeNote: number | null;
  setActiveNote: (value: number | null) => void;
  isCollapseDesc: boolean;
  setCollapseDesc: (value: boolean) => void;
  setCurrentCommentCallback: (
    commentId: number | null,
    title: string | null,
  ) => void;
  setStateDeleteBtn: (value: boolean) => void;
  setTimer: (value: boolean) => void;
  isTimer: boolean;
  timerCount: number;
  setTimerCount: (value: number) => void;
};

export const Note: FC<NotePropsType> = memo(
  ({
    item,
    collapseNote,
    stateDeleteBtn,
    activeNote,
    setActiveNote,
    isCollapseDesc,
    setCurrentCommentCallback,
    setStateDeleteBtn,
    setTimer,
    isTimer,
    timerCount,
    setTimerCount,
  }) => {
    const render: ListRenderItem<CommentType> = ({item}) => {
      return (
        <Comment
          commentItem={item}
          setCurrentCommentCallback={setCurrentCommentCallback}
        />
      );
    };

    const leftSwipe = () => {
      return (
        <View>
          <Text> </Text>
        </View>
      );
    };

    return (
      <View style={styles.noteBlock}>
        <GestureHandlerRootView>
          <Swipeable
            renderRightActions={leftSwipe}
            onSwipeableRightWillOpen={() => {
              setActiveNote(item.id);
              setStateDeleteBtn(true);
            }}>
            <TouchableOpacity
              onPress={() => {
                collapseNote(item.id);
              }}
              style={[styles.note]}>
              <View style={styles.textContent}>
                <Text style={styles.NoteTitle}>{item.title}</Text>
                <Text style={styles.noteLine}>|</Text>
                <Text style={styles.NoteShortDescription}>
                  {item.description.slice(0, 20)}
                </Text>
              </View>
              <View
                style={[
                  styles.arrowWrap,
                  {display: stateDeleteBtn || isTimer ? 'none' : 'flex'},
                ]}>
                <MemoSvgArrowComponent />
              </View>

              {!isTimer && stateDeleteBtn && activeNote === item.id && (
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    setTimer(true);
                  }}>
                  <Text style={styles.deleteBtnText}>Удалить</Text>
                </TouchableOpacity>
              )}

              {isTimer && stateDeleteBtn && activeNote === item.id && (
                <TouchableOpacity
                  style={styles.timerBtn}
                  onPress={() => {
                    setActiveNote(null);
                    setStateDeleteBtn(false);
                    setTimer(false);
                    setTimerCount(5);
                  }}>
                  <MemoRotateSvgComponent content={timerCount} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
        {isCollapseDesc && activeNote === item.id && (
          <View style={styles.noteDescription}>
            <Text style={styles.noteDate}>{item.date}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <View style={styles.commentsList}>
              <FlatList
                data={item.comments}
                renderItem={render}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 35,
    paddingHorizontal: 20,
    width: '100%',
  },
  noteList: {
    marginTop: '40%',
  },
  noteBlock: {},
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0, 0.2)',
    borderRadius: 5,
    height: 37,
  },
  textContent: {
    flexDirection: 'row',
  },
  NoteTitle: {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
    paddingBottom: 11,
    paddingTop: 10,
    paddingRight: 6.5,
    paddingLeft: 17.36,
  },
  noteLine: {
    lineHeight: 15,
    paddingBottom: 11,
    paddingTop: 11,
  },
  NoteShortDescription: {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
    color: '#000000',
    paddingTop: 15,
    paddingBottom: 13,
    paddingLeft: 8.68,
    paddingRight: 15,
  },
  arrowWrap: {
    paddingTop: 7,
    paddingRight: 13.02,
    paddingBottom: 6,
  },
  deleteBtn: {
    backgroundColor: '#E30000',
    height: 37,
    borderRadius: 5,
  },
  deleteBtnText: {
    paddingTop: 12,
    paddingBottom: 11,
    paddingHorizontal: 23,

    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Raleway',
  },
  timerBtn: {
    height: 37,
    backgroundColor: '#E30000',
    borderRadius: 5,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteDescription: {
    flexDirection: 'column',
  },
  noteDate: {
    textAlign: 'right',
    paddingTop: 11,
    paddingRight: 20,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
    color: '#8F8F8F',
    fontFamily: 'Raleway',
  },
  descriptionText: {
    textAlign: 'left',
    paddingTop: 9.11,
    paddingRight: 26,
    paddingBottom: 26,
    paddingLeft: 17,
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
    fontFamily: 'Raleway',
  },
  commentsList: {},
});
