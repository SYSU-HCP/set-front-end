import GroupSeven from './pages/GroupSeven';
import GroupTwo from './pages/GroupTwo';
import IntelligentAlbum from './pages/IntelligentAlbum';
import LookupClothes from './pages/LookupClothes';
import MedicalDiagnosis from './pages/MedicalDiagnosis';
import NeuralNetworks from './pages/NeuralNetworks';
import SpeechRecognition from './pages/SpeechRecognition';

interface IRoute {
  path: string;
  component: React.ComponentType<{}>;
  meta: IMeta;
}

const routes: IRoute[] = [{
  component: MedicalDiagnosis,
  meta: {
    TA: '黄殷雅',
    members: ['侯培中', '张园园', '张漫榕', '庞景龙', '王宇翔', '颜泽鑫'],
    name: '影像报告',
    title: '影像报告生成'
  },
  path: '/medical-diagnosis',
}, {
  component: NeuralNetworks,
  meta: {
    TA: '许瑞嘉',
    members: ['叶佳全',' 林润清', '莫华坤', '周林', '杜一柯'],
    name: '神经网络',
    title: '神经网络'
  },
  path: '/neural-networks',
}, {
  component: IntelligentAlbum,
  meta: {
    TA: '陈日全',
    members: ['梁杰富', '叶政', '张凯', '赵寒旭', '许慕欣', '杨霁晗'],
    name: '智能相册',
    title: '智能相册'
  },
  path: '/intelligent-album',
}, {
  component: LookupClothes,
  meta: {
    TA: '周启贤',
    members: ['吴博文','李卓然','仇弈彬','冯禹豪','陈欣宜','詹宗沅','王茂源','周长安'],
    name: '查找衣服',
    title: '查找衣服'
  },
  path: '/lookup-clothes',
}, {
  component: SpeechRecognition,
  meta: {
    TA: '彭杰锋',
    members: ['袁均良','张萌杰','张益强','黄泳锋'],
    name: '语音识别',
    title: '语音识别',
  },
  path: '/speech-recognition',
}, {
  component: GroupSeven,
  meta: {
    TA: '蔡俊浩',
    members: ['杨耿聪','杨立诚','张万康','曹蕊'],
    name: '第七组',
    title: '第七组',
  },
  path: '/group-seven',
}, {
  component: GroupTwo,
  meta: {
    TA: '胡永恒',
    members: ['何子龙','张应鸿','丘晓峰','黄艺彬','陈思锐'],
    name: '第二组',
    title: '第二组',
  },
  path: '/group-two',
}];

export default routes;