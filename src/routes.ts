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
    members: [],
    name: '医疗诊断',
    title: '医疗诊断'
  },
  path: '/medical-diagnosis',
}, {
  component: NeuralNetworks,
  meta: {
    TA: '许瑞嘉',
    members: [],
    name: '神经网络',
    title: '神经网络'
  },
  path: '/neural-networks',
}, {
  component: IntelligentAlbum,
  meta: {
    TA: '陈日全',
    members: [],
    name: '智能相册',
    title: '智能相册'
  },
  path: '/intelligent-album',
}, {
  component: LookupClothes,
  meta: {
    TA: '周启贤',
    members: [],
    name: '查找衣服',
    title: '查找衣服'
  },
  path: '/lookup-clothes',
}, {
  component: SpeechRecognition,
  meta: {
    TA: '彭杰锋',
    members: [],
    name: '语音识别',
    title: '语音识别',
  },
  path: '/speech-recognition',
}];

export default routes;