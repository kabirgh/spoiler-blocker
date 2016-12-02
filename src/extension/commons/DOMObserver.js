import MutationSummary from "mutation-summary";

export default class DOMObserver {
	constructor(node) {
		this.node = node;
		this.attributesObserver = null;
		this.addedNodesObserver = null;
	}

	// Invokes callback if any of specified attributes of node change.
	notifyAttributeChange(attributes, callback) {
		var observer = new MutationObserver( function(mutationRecord) {
			mutationRecord.forEach( function() {
				callback();
			});
		});

		this.attributesObserver = observer;

		observer.observe(this.node, {
			attributeFilter: attributes
		});
	}

	// Invokes callback if children (including subtree children) are added to node.
	// Callback takes NodeList of nodes added as only argument
	observeAddedNodes(queries, callback) {
		function internalAddedNodesCallback(summaries) {
			callback(summaries[0].added);
		}

		var observer = new MutationSummary({
			callback: internalAddedNodesCallback,
			rootNode: this.node,
			queries: queries
		});

		this.addedNodesObserver = observer;
	}

	disconnectAttributesObserver() {
		if (this.attributesObserver === null) {
			throw new ReferenceError("Attributes observer is not initialised");
		}
		else {
			this.attributesObserver.disconnect();
		}
	}

	disconnectAddedNodesObserver() {
		if (this.addedNodesObserver === null) {
			throw new ReferenceError("AddedNodes observer is not initialised");
		}
		else {
			this.addedNodesObserver.disconnect();
		}
	}
}