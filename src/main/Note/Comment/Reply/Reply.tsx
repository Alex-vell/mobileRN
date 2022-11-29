import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ReplyType} from '../../Note';

type ReplyPropsType = {
  item: ReplyType;
};

export const Reply: FC<ReplyPropsType> = ({item}) => {
  return (
    <View style={styles.replyBlock}>
      <View style={styles.reply}>
        <Text style={styles.replyTitle}>Ответ на комментарий</Text>
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

const styles = StyleSheet.create({
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
});
