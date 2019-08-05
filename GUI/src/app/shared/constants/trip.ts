import {Drive, User} from '../types/common';

export const TEST_TRIP: Drive = {
  id: 1,
  startTime: '2222222',
  endTime: '333333333',
  startPoint: [53.89114, 27.688391],
  finPoint: [53.92766699999999, 27.683066000000036],
  name: 'Илимская-Купревича',
  passengers: [],
  freePlaceCount: 9,
  //routeUrl: '',
   driver: new User(),
  //messages: [],
  path:[[53.89114,27.688391],[53.891263,27.688406],[53.891284,27.688404000000002],[53.891304999999996,27.688393],[53.891318,27.688366000000002],[53.891326,27.688334],[53.891349,27.687910000000002],[53.891349,27.687874],[53.89134,27.687847],[53.891321,27.687824000000003],[53.891296,27.687810000000002],[53.891158999999995,27.687783000000003],[53.891023999999994,27.687756000000004],[53.891023999999994,27.687756000000004],[53.89103899999999,27.687561000000002],[53.89106199999999,27.687253000000002],[53.89110899999999,27.686631000000002],[53.89110699999999,27.686563000000003],[53.89110199999999,27.686511000000003],[53.89108599999999,27.686450000000004],[53.890782999999985,27.685787000000005],[53.89069199999999,27.685567000000006],[53.89069199999999,27.685567000000006],[53.89030899999999,27.686088000000005],[53.88979299999999,27.686792000000004],[53.88971599999999,27.686896000000004],[53.889329999999994,27.687408000000005],[53.889064999999995,27.687765000000006],[53.888946999999995,27.687922000000007],[53.888566,27.688429000000006],[53.888419999999996,27.688635000000005],[53.888282,27.688841000000004],[53.888282,27.688841000000004],[53.888366,27.689015000000005],[53.888708,27.689718000000006],[53.88894,27.690198000000006],[53.889013,27.690337000000007],[53.889089,27.690482000000006],[53.889187,27.690623000000006],[53.889269999999996,27.690718000000007],[53.889325,27.690796000000006],[53.889365,27.690890000000007],[53.889486999999995,27.691281000000007],[53.889616999999994,27.69168300000001],[53.88970799999999,27.691982000000007],[53.88973699999999,27.692094000000008],[53.88975999999999,27.69220900000001],[53.88978499999999,27.69236200000001],[53.88979699999999,27.69246300000001],[53.88982699999999,27.69295400000001],[53.889833999999986,27.693052000000012],[53.889833999999986,27.693052000000012],[53.88999899999999,27.69305100000001],[53.89008099999999,27.693059000000012],[53.89028099999999,27.693066000000012],[53.89032599999999,27.693077000000013],[53.89036999999999,27.693098000000013],[53.89047499999999,27.693195000000014],[53.89050599999999,27.693217000000015],[53.89053999999999,27.693226000000013],[53.89059899999999,27.693220000000014],[53.890683999999986,27.693198000000013],[53.890788999999984,27.693166000000012],[53.89097299999998,27.693098000000013],[53.89158099999998,27.692840000000015],[53.89267499999998,27.692392000000016],[53.89345799999998,27.692047000000017],[53.89426899999998,27.691673000000016],[53.89507299999998,27.691322000000017],[53.89591999999998,27.690934000000016],[53.89630399999998,27.690756000000018],[53.896884999999976,27.69049800000002],[53.897163999999975,27.69037500000002],[53.89742499999998,27.69026800000002],[53.89771199999998,27.69015700000002],[53.898038999999976,27.69003100000002],[53.89901499999998,27.68967800000002],[53.899333999999975,27.689553000000018],[53.89961099999997,27.689420000000016],[53.900000999999975,27.689210000000017],[53.90034199999997,27.688995000000016],[53.900537999999976,27.688882000000017],[53.90062399999998,27.68883500000002],[53.900717999999976,27.688789000000018],[53.900895999999975,27.68871100000002],[53.901047999999975,27.68865700000002],[53.901232999999976,27.68860200000002],[53.90174099999998,27.68850400000002],[53.90228299999998,27.68840800000002],[53.90246999999998,27.68835900000002],[53.90260399999998,27.68831800000002],[53.90280699999998,27.68823100000002],[53.90315699999998,27.68808600000002],[53.90368399999998,27.68786700000002],[53.90394799999998,27.68775800000002],[53.904857999999976,27.68741300000002],[53.90580499999997,27.687010000000022],[53.90708299999997,27.686465000000023],[53.90836199999997,27.685920000000024],[53.90915899999997,27.685573000000023],[53.90915899999997,27.685573000000023],[53.909246999999965,27.685630000000025],[53.909300999999964,27.685686000000025],[53.909347999999966,27.685760000000027],[53.909373999999964,27.685937000000028],[53.90940099999997,27.686133000000027],[53.90944199999997,27.686399000000026],[53.90944199999997,27.686399000000026],[53.90948199999997,27.686519000000025],[53.90949099999997,27.686542000000024],[53.90950999999997,27.686576000000024],[53.90952499999997,27.686594000000024],[53.909542999999964,27.686608000000025],[53.90958099999997,27.686629000000025],[53.90973299999997,27.686571000000026],[53.909848999999966,27.686507000000027],[53.91122399999997,27.685702000000028],[53.91204199999997,27.685198000000028],[53.91256499999997,27.684844000000027],[53.913590999999975,27.684422000000026],[53.914617999999976,27.684001000000027],[53.91573199999998,27.683550000000025],[53.91580499999998,27.683519000000025],[53.91623299999998,27.683340000000026],[53.91743699999998,27.682847000000027],[53.91864099999998,27.682355000000026],[53.91984699999998,27.681862000000027],[53.92102599999998,27.68143800000003],[53.92142399999998,27.681295000000027],[53.92161599999998,27.681219000000027],[53.92200399999998,27.681060000000027],[53.92213499999998,27.681008000000027],[53.92242899999998,27.680874000000028],[53.92349599999998,27.680382000000026],[53.92415399999998,27.680083000000028],[53.92481099999998,27.67978300000003],[53.92481099999998,27.67978300000003],[53.92496799999998,27.67986900000003],[53.925058999999976,27.67993800000003],[53.92513699999998,27.680027000000027],[53.92524999999998,27.680217000000027],[53.92536699999998,27.680441000000027],[53.92548999999998,27.680715000000028],[53.92559799999998,27.680978000000028],[53.92565599999998,27.68112700000003],[53.92568199999998,27.68118400000003],[53.925781999999984,27.68139100000003],[53.92594299999998,27.68163300000003],[53.926555999999984,27.68296100000003],[53.92658299999999,27.68302900000003],[53.92659399999999,27.68305600000003],[53.92664099999999,27.68317000000003],[53.92664099999999,27.68317000000003],[53.926765999999986,27.68303300000003],[53.92686999999999,27.68292200000003],[53.926917999999986,27.68289200000003],[53.926988999999985,27.68286700000003],[53.92712599999999,27.68284700000003],[53.92722699999999,27.68282700000003],[53.92759199999999,27.682756000000033],[53.92781499999999,27.682712000000034],[53.92781499999999,27.682712000000034],[53.92782499999999,27.682965000000035],[53.92781399999999,27.683020000000035],[53.92778499999999,27.683045000000035],[53.92766699999999,27.683066000000036]],
  sumOfKm: 1,
  pickUpPoint: [53.89114, 27.688391]
};
