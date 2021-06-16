import { Injectable } from '@nestjs/common';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// 交集
export function intersection(
  left: Array<number>,
  right: Array<number>,
): number[] {
  return left.filter((val) => {
    return right.indexOf(val) > -1;
  });
}

// 并集
export function union(left: Array<number>, right: Array<number>): number[] {
  return left.concat(
    right.filter(function (val) {
      return !(left.indexOf(val) > -1);
    }),
  );
}

// 补集 两个数组各自没有的集合
export function complement(
  left: Array<number>,
  right: Array<number>,
): number[] {
  return left
    .filter(function (val) {
      return !(right.indexOf(val) > -1);
    })
    .concat(
      right.filter(function (val) {
        return !(left.indexOf(val) > -1);
      }),
    );
}

// 差集
export function diff(left: Array<number>, right: Array<number>): number[] {
  return left.filter(function (val) {
    return right.indexOf(val) === -1;
  });
}

// 深拷贝
// eslint-disable-next-line @typescript-eslint/ban-types
export function deepCopy(source: Object): any {
  if (null == source || {} == source || [] == source) {
    return source;
  }

  let newObject: any;
  let isArray = false;
  if ((source as any).length) {
    newObject = [];
    isArray = true;
  } else {
    newObject = {};
    isArray = false;
  }

  for (const key of Object.keys(source)) {
    if (null == source[key]) {
      if (isArray) {
        newObject.push(null);
      } else {
        newObject[key] = null;
      }
    } else {
      const sub =
        typeof source[key] == 'object'
          ? this.deepCopy(source[key])
          : source[key];
      if (isArray) {
        newObject.push(sub);
      } else {
        newObject[key] = sub;
      }
    }
  }
  return newObject;
}

/**
 * 休眠函数
 * @param time 秒数
 */
export function sleep(time: number): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });
}

/**
 * 从现在到凌晨
 */
export function beforeDawExpire(): number {
  const date = new Date();
  return Math.ceil(
    (new Date(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`,
    ).getTime() -
      new Date().getTime()) /
      1000,
  );
}

// 统计元素个数
export function elementCount(array: { userId: number }[], name: string): {} {
  const keys = {};
  for (let index = 0; index < array.length; index++) {
    const element = array[index][name];
    if (keys[element]) {
      keys[element] = keys[element] + 1;
    } else {
      keys[element] = 1;
    }
  }
  return keys;
}
/**
 * 获取2个数之前的随机值
 * @param min number
 * @param max number
 */
export function randomNumBetweenTwoInput(min: number, max: number): number {
  return Math.ceil(Math.random() * (max - min) + min);
}
// 转换时差
export function transitTimeDifference(
  time: Date,
  timeDifference = 8,
): moment.Moment {
  return moment(time).add(timeDifference, 'hour');
}
