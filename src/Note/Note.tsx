/* eslint-disable @typescript-eslint/no-shadow */
import React, {FC, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MemoSvgArrowComponent} from '../assets/arrowComponent';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {MemoRotateSvgComponent} from '../assets/rotateSVGComponent';

type ReplyType = {
  commentId: number;
  title: string;
  id: number;
  description: string;
  date: string;
};

type CommentType = {
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

export const Note: FC<NotePropsType> = ({
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
  const [isShowReplies, setIsShowReplies] = useState(false);

  const collapseReplies = () => {
    setIsShowReplies((state: any) => !state);
  };

  const renderReplies: ListRenderItem<ReplyType> = ({item}) => {
    return (
      <View style={styles.replyBlock}>
        <View style={styles.reply}>
          <Text style={styles.replyTitle}>
            Ответ на комментарий
            {/* "{item.title}"*/}
          </Text>
          <Text style={styles.replyText}>{item.description}</Text>
          <View style={styles.replyDateWrap}>
            <Text style={styles.replyDate}>{item.date}</Text>
            <TouchableOpacity style={styles.replyBtn}>
              <Text style={styles.replyBtnText}>Ответить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const render: ListRenderItem<CommentType> = ({item}) => {
    return (
      <View style={styles.commentBlock}>
        <View style={styles.comment}>
          <Text style={styles.commentTitle}>{item.title}</Text>
          <Text style={styles.commentText}>{item.description}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.commentDate}>{item.date}</Text>
            <TouchableOpacity
              style={styles.replyBtn}
              onPress={() => setCurrentCommentCallback(item.id, item.title)}>
              <Text style={styles.replyBtnText}>Ответить</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.repliesList}>
          <FlatList
            // data={item.replies}
            data={isShowReplies ? item.replies : item.replies.slice(0, 1)}
            renderItem={renderReplies}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            keyExtractor={item => item.id.toString()}
          />

          <TouchableOpacity
            disabled={item.replies.length === 1}
            onPress={collapseReplies}
            style={{
              paddingLeft: 8,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            {item.replies.length === 0 ? null : isShowReplies ? (
              <View style={styles.collapseBtnWrap}>
                <View style={styles.lineCollapseBtn} />
                <Text style={styles.collapseBtn}>Скрыть</Text>
              </View>
            ) : (
              <View style={styles.collapseBtnWrap}>
                <View style={styles.lineCollapseBtn} />
                <Text style={styles.collapseBtn}>Показать все ответы</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
          rightThreshold={200}
          onSwipeableRightWillOpen={() => {
            // removeNote(item.id)
            setActiveNote(item.id);
            setStateDeleteBtn(true);
          }}>
          <TouchableOpacity
            onPress={() => {
              collapseNote(item.id);
            }}
            style={styles.note}>
            <View style={styles.textContent}>
              <Text style={styles.NoteTitle}>{item.title}</Text>
              <Text style={styles.noteLine}>|</Text>
              <Text style={styles.NoteShortDescription}>
                {item.description.slice(0, 20)}
              </Text>
            </View>
            <View style={styles.arrowWrap}>
              <MemoSvgArrowComponent />
            </View>

            {!isTimer && stateDeleteBtn && activeNote === item.id && (
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  // setActiveNote(item.id)
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
          {/*<TouchableOpacity>*/}
          {/*    <Text style={{textAlign: "left", paddingBottom: 20}}>Комментировать</Text>*/}
          {/*</TouchableOpacity>*/}
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
};

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
    // fontFamily: 'Raleway',
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
    // fontFamily: 'Raleway',
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
    // transform: [{ rotate: '90deg'}],
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
    // paddingTop: 10,
    // paddingBottom: 10,
    // marginLeft: 20,
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
  },
  commentsList: {},
  commentBlock: {},
  comment: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 5,
    paddingTop: 11,
    paddingRight: 7,
    paddingBottom: 7,
    paddingLeft: 11,
    marginHorizontal: 17,
    marginBottom: 10,
  },
  commentTitle: {
    ontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
    paddingBottom: 5,
  },
  commentText: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
    color: '#000000',
    paddingBottom: 5,
  },
  commentDate: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 7,
    lineHeight: 8,
    color: '#8F8F8F',
    paddingBottom: 7,
  },
  replyBtn: {
    paddingBottom: 7,
    marginLeft: 10,
  },
  replyBtnText: {
    ntStyle: 'normal',
    fontWeight: '600',
    fontSize: 7,
    lineHeight: 8,
    color: '#8F8F8F',
  },
  repliesList: {
    marginLeft: 30,
  },
  replyBlock: {},
  reply: {},
  replyTitle: {
    ontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    color: '#000000',
    paddingLeft: 8,
    paddingBottom: 5,
  },
  replyText: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
    color: '#000000',
    paddingLeft: 8,
    paddingBottom: 5,
  },
  replyDateWrap: {
    flexDirection: 'row',
    paddingLeft: 8,
  },
  replyDate: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 7,
    lineHeight: 8,
    color: '#8F8F8F',
    paddingBottom: 7,
  },
  collapseBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // width: 50,
    alignSelf: 'center',
  },
  lineCollapseBtn: {
    backgroundColor: '#8F8F8F',
    height: 1,
    alignSelf: 'center',
    width: 17,
    marginLeft: -21,
    marginRight: 4,
  },
  collapseBtn: {
    fontSize: 8,
    lineHeight: 9,
    fontWeight: '600',
  },
});
