import React, {FC, memo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommentType, ReplyType} from '../Note';
import {Reply} from './Reply/Reply';

type CommentPropsType = {
  commentItem: CommentType;
  setCurrentCommentCallback: (
    commentId: number | null,
    title: string | null,
  ) => void;
};

export const Comment: FC<CommentPropsType> = memo(
  ({commentItem, setCurrentCommentCallback}) => {
    const [isShowReplies, setIsShowReplies] = useState(false);

    const collapseReplies = () => {
      setIsShowReplies((state: any) => !state);
    };

    const renderReplies: ListRenderItem<ReplyType> = ({item}) => {
      return <Reply item={item} />;
    };
    return (
      <View style={styles.commentBlock}>
        <View style={styles.comment}>
          <Text style={styles.commentTitle}>{commentItem.title}</Text>
          <Text style={styles.commentText}>{commentItem.description}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.commentDate}>{commentItem.date}</Text>
            <TouchableOpacity
              style={styles.replyBtn}
              onPress={() =>
                setCurrentCommentCallback(commentItem.id, commentItem.title)
              }>
              <Text style={styles.replyBtnText}>Ответить</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.repliesList}>
          <FlatList
            data={
              isShowReplies
                ? commentItem.replies
                : commentItem.replies.slice(0, 1)
            }
            renderItem={renderReplies}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            keyExtractor={item => item.id.toString()}
          />
          <TouchableOpacity
            disabled={commentItem.replies.length === 1}
            onPress={collapseReplies}
            style={{
              paddingLeft: 8,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            {commentItem.replies.length === 0 ? null : isShowReplies ? (
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
  },
);

const styles = StyleSheet.create({
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
    fontFamily: 'Raleway',
  },
  commentText: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
    color: '#000000',
    paddingBottom: 5,
    fontFamily: 'Raleway',
  },
  commentDate: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 7,
    lineHeight: 8,
    color: '#8F8F8F',
    paddingBottom: 7,
    fontFamily: 'Raleway',
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
    fontFamily: 'Raleway',
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
    fontFamily: 'Raleway',
  },
  replyText: {
    ontStyle: 'normal',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
    color: '#000000',
    paddingLeft: 8,
    paddingBottom: 5,
    fontFamily: 'Raleway',
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
    fontFamily: 'Raleway',
  },
  collapseBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    fontFamily: 'Raleway',
  },
});
