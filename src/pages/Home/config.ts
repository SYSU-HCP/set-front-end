/**
 * 这个概览页面
 * 
 * 要复用，可以修改下面配置
 *
 */


export interface IProject {
  authors: string[]
  desc: string
  title: string
  picture?: string
}

export interface IConfig {
  title: string
  projects: IProject[]
}


const config : IConfig = {
  projects: [
    {
      authors: ['黄殷雅','黄殷雅','黄殷雅','黄殷雅','黄殷雅'],
      desc: '人工神经网络（英语：Artificial Neural Network，ANN），简称神经网络（Neural Network，NN）或類神經網絡，在机器学习和认知科学领域，是一种模仿生物神经网络（动物的中樞神經系統，特别是大脑）的结构和功能的数学模型或计算模型，用于对函数进行估计或近似',
      picture: 'http://5b0988e595225.cdn.sohucs.com/images/20180305/d7f62d81e334434c9d034e9be9f85be3.jpeg',
      title: '医疗诊断',
    },
    {
      authors: ['许瑞嘉','黄殷雅','黄殷雅','黄殷雅','黄殷雅','黄殷雅'],
      desc: '人工神经网络（英语：Artificial Neural Network，ANN），简称神经网络（Neural Network，NN）或類神經網絡，在机器学习和认知科学领域，是一种模仿生物神经网络（动物的中樞神經系統，特别是大脑）的结构和功能的数学模型或计算模型，用于对函数进行估计或近似',
      picture: 'http://5b0988e595225.cdn.sohucs.com/images/20180305/d7f62d81e334434c9d034e9be9f85be3.jpeg',
      title: '神经网络',
    },
    {
      authors: ['许瑞嘉','黄殷雅','黄殷雅','黄殷雅','黄殷雅','黄殷雅'],
      desc: '人工神经网络（英语：Artificial Neural Network，ANN），简称神经网络（Neural Network，NN）或類神經網絡，在机器学习和认知科学领域，是一种模仿生物神经网络（动物的中樞神經系統，特别是大脑）的结构和功能的数学模型或计算模型，用于对函数进行估计或近似',
      picture: 'http://5b0988e595225.cdn.sohucs.com/images/20180305/d7f62d81e334434c9d034e9be9f85be3.jpeg',
      title: '智能相册',
    },
    {
      authors: ['许瑞嘉','黄殷雅','黄殷雅','黄殷雅','黄殷雅','黄殷雅'],
      desc: '人工神经网络（英语：Artificial Neural Network，ANN），简称神经网络（Neural Network，NN）或類神經網絡，在机器学习和认知科学领域，是一种模仿生物神经网络（动物的中樞神經系統，特别是大脑）的结构和功能的数学模型或计算模型，用于对函数进行估计或近似',
      picture: 'http://5b0988e595225.cdn.sohucs.com/images/20180305/d7f62d81e334434c9d034e9be9f85be3.jpeg',
      title: '查找衣服',
    },
    {
      authors: ['许瑞嘉','黄殷雅','黄殷雅','黄殷雅','黄殷雅','黄殷雅'],
      desc: '人工神经网络（英语：Artificial Neural Network，ANN），简称神经网络（Neural Network，NN）或類神經網絡，在机器学习和认知科学领域，是一种模仿生物神经网络（动物的中樞神經系統，特别是大脑）的结构和功能的数学模型或计算模型，用于对函数进行估计或近似',
      picture: 'http://5b0988e595225.cdn.sohucs.com/images/20180305/d7f62d81e334434c9d034e9be9f85be3.jpeg',
      title: '语音识别',
    }
  ],
  title: '2018年秋季实训'
}

export default config