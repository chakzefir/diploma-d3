import * as d3 from 'd3';

class Force {
	constructor (data = {}) {
        // this.staticForce(data);
        this.simulationForce(data);
	}
	getData() {
		const data = d3.json("https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json");
		return data
	}
	loading(svg) {
        return svg.append("text")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .text("Simulating. One moment please…");
	}
  	color(d) {
  		if(d.id !== 'Server') {
  			return 'Blue'
  		}
  		return 'Green'
  	}
    getLineLength(d) {
        return Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2))
    }
    dragAction(simulation) {
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
  	simulationForce(data) {
		const height = 600;
		const width = 600;
		const svg = d3.select(document.querySelector("svg"))
			.attr("width", width)
			.attr("height", height);
		const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  		const links = data.links.map(d => Object.create(d));
		const nodes = data.nodes.map(d => Object.create(d));

		// const simulation = d3.forceSimulation(nodes)
         //    .force("charge", d3.forceManyBody())
		// 	.force("link", d3.forceLink(links).id(d => d.id).distance(30))
		// 	// .force("center", d3.forceCenter(width / 2, height / 2))
         //    .stop()
		// 	;

        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-100))
            .force("link", d3.forceLink(links).id(d => d.id).distance(50))
            .stop();

        for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
            simulation.tick();
        }

        const link = g.append("g")
            .attr("stroke", "#000")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        const node = g.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 10)
            .attr("fill", this.color)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .call(this.dragAction(simulation));

        node.append("title")
            .text(d => d.id);

        // link.append("title")
        //     .text(d => console.log(d))

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)
                .attr("length", d => this.getLineLength(d))

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });
  	}
    staticForce() {
        const svg = d3.select("svg").attr("width", 600).attr("height", 600),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const n = 10,
            nodes = d3.range(n).map(function(i) { return {index: i}; }),
            links = d3.range(n).map(function(i) { return {source: i, target: (i + 3) % n}; });


        //initial: https://bl.ocks.org/mbostock/1667139
        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-80))
            .force("link", d3.forceLink(links).distance(20).strength(1).iterations(10))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .stop();

        // const loading = this.loading(svg);

        // Use a timeout to allow the rest of the page to load first.
        d3.timeout(() => {
            // loading.remove();

            // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
            for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
                simulation.tick();
            }

            const link = g.append("g")
                .attr("stroke", "#000")
                .attr("stroke-width", 1.5)
                .selectAll("line")
                .data(links)
                .enter().append("line")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            const node = g.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", 4.5)
                .call(this.dragAction(simulation));

            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y)

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });
        });
    }
  	oldSchoolForce(data) {
        const height = 600;
        const width = 600;
        const svg = d3.select(document.querySelector("svg"))
            .attr("width", width)
            .attr("height", height);

        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("center", d3.forceCenter(width / 2, height / 2))
        ;

        // const svg = d3.select(svgNode);

        const link = svg.append("g")
            .attr("stroke", "#000")
            .selectAll("line")
            .data(links)
            .join("line");

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 10)
            .attr("fill", this.color)
            .call(this.dragAction(simulation));

        node.append("title")
            .text(d => d.id);

        link.append("title")
            .text(d => console.log(d))

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)
                .attr("length", d => this.getLineLength(d))

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        return svg.node();
    }
}

export default Force