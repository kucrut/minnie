import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { stripApiHost, isInternalLink } from 'helpers.js'


export default class Content_Mixin extends Component {
	onClick(e) {
		const anchor = e.target.closest('a')

		if ( anchor && isInternalLink( anchor.href ) ) {
			e.preventDefault()
			this.props.dispatch( push( stripApiHost( anchor.href ) ) )
		}
	}
}
