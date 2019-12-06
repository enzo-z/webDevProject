function setupGraph(chartData){
    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .staggerLabels(true)
          .tooltips(false)
          .showValues(true)
      
        d3.select('#chart svg')
          .datum(chartData)
          .transition().duration(500)
          .call(chart);
      
        nv.utils.windowResize(chart.update);
      
        return chart;
    });
}
//Pegar os dados necessários para o gráfico
$.getJSON("graphics_services.php", 
    function (data){
        $arr2 = [];
        for(let i = 0; i<data.length; i++){
            $arr2.push({
                label: data[i]['nome'],
                value: data[i]['qntd_cards']
            },)
        }
        var chartData = [{
            key: "Cumulative Return",
            values: $arr2 
        }];
        setupGraph(chartData) //Evitar erro de assincronismo 
    }
);
